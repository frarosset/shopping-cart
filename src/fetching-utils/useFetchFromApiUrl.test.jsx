import { vi, describe, it, expect, afterEach } from "vitest";
import { renderHook, waitFor, act } from "@testing-library/react";
import useFetchFromApiUrl from "./useFetchFromApiUrl";

const validApiUrl = "some/valid/url";
const validApiExpectedData = { data: "valid" };

const anotherValidApiUrl = "another/" + validApiUrl;
const anotherValidApiExpectedData = { data: "another valid" };

const fetchInvalidApiUrl = "some/fetch/invalid/url";
const fetchInvalidApiUrlError = "Fetch Invalid Error";

const apiInvalidApiUrl = "some/api/invalid/url";
const invalidApiExpectedData = { data: "invalid" };

// Mock global fetch
const jsonMock = vi.fn();

global.fetch = vi.fn((url) => {
  if (url === validApiUrl) {
    return Promise.resolve({
      json: () => {
        jsonMock();
        return Promise.resolve(validApiExpectedData);
      },
    });
  } else if (url === anotherValidApiUrl) {
    return Promise.resolve({
      json: () => {
        jsonMock();
        return Promise.resolve(anotherValidApiExpectedData);
      },
    });
  } else if (url === fetchInvalidApiUrl) {
    return Promise.reject(new Error(fetchInvalidApiUrlError));
  } else if (url === apiInvalidApiUrl) {
    return Promise.resolve({
      status: 400,
      json: () => {
        jsonMock();
        return Promise.resolve(invalidApiExpectedData);
      },
    });
  } else {
    throw new Error("Invalid url");
  }
});

/* mocks are hoisted: reset them after each test */
afterEach(() => {
  vi.resetAllMocks();
});

// helper function that checks that fetch has been called with the correct url
// and that the json method has been called or not
async function assertHookResults(
  result,
  expectedData, // expected object for data
  isExpectedError, // true if it is an instance of Error (otherwise it is null)
  expectedLoading // true or false
) {
  await waitFor(() => {
    expect(result.current.data).toEqual(expectedData);
    if (isExpectedError) {
      expect(result.current.error).toBeInstanceOf(Error);
    } else {
      expect(result.current.error).toBeNull();
    }
    expect(result.current.loading).toBe(expectedLoading);
  });
}

// helper function that checks that fetch has been called with the correct url
// and that the json method has been called or not
function assertFetchAndJsonCalled(url, jsonCalled) {
  expect(fetch).toHaveBeenCalledExactlyOnceWith(url, expect.anything());

  if (jsonCalled) {
    expect(jsonMock).toHaveBeenCalledOnce();
  } else {
    expect(jsonMock).not.toHaveBeenCalled();
  }
}

describe("useFetchFromApiUrl", () => {
  describe("on mount", () => {
    const testCallbackSetup = async (newUrl) => {
      const { result } = renderHook(() => useFetchFromApiUrl(newUrl));

      // Initially, data and error are false, and loading is set to true
      await assertHookResults(result, null, false, true);

      return result;
    };

    it("fetches data correctly when a valid url is provided", async () => {
      const result = await testCallbackSetup(validApiUrl);

      await assertHookResults(result, validApiExpectedData, false, false);

      assertFetchAndJsonCalled(validApiUrl, true);
    });

    it("handles the case of fetch error occurring", async () => {
      const result = await testCallbackSetup(fetchInvalidApiUrl);

      await assertHookResults(result, null, true, false);

      assertFetchAndJsonCalled(fetchInvalidApiUrl, false);
    });

    it("handles the case of api error occurring", async () => {
      const result = await testCallbackSetup(apiInvalidApiUrl);

      await assertHookResults(result, null, true, false);

      assertFetchAndJsonCalled(apiInvalidApiUrl, false);
    });
  });

  describe("re-rendering", () => {
    const testCallbackSetup = async (newUrl) => {
      const { rerender, result } = renderHook(
        (apiUrl) => useFetchFromApiUrl(apiUrl),
        {
          initialProps: validApiUrl,
        }
      );

      // Wait for the initial fetch to complete.
      await assertHookResults(result, validApiExpectedData, false, false);

      // Restore all mocks
      vi.restoreAllMocks();

      rerender(newUrl);

      return result;
    };

    it("doesn't refetches if re-rendered with the same url", async () => {
      await testCallbackSetup(validApiUrl);

      expect(fetch).not.toHaveBeenCalled;
    });

    it("refetches if re-rendered with different url", async () => {
      const result = await testCallbackSetup(anotherValidApiUrl);

      await assertHookResults(
        result,
        anotherValidApiExpectedData,
        false,
        false
      );

      assertFetchAndJsonCalled(anotherValidApiUrl, true);
    });
  });

  describe("returned fetchFromApiUrl() callback", () => {
    const testCallbackSetup = async (newUrl) => {
      const { result } = renderHook(() => useFetchFromApiUrl(validApiUrl));

      // Wait for the initial fetch to complete.
      await assertHookResults(result, validApiExpectedData, false, false);

      // Restore all mocks
      vi.restoreAllMocks();

      // call the callback
      act(() => {
        result.current.fetchFromApiUrl(newUrl);
      });

      // Initially, data and error are those from the previous call
      await assertHookResults(result, validApiExpectedData, false, true);

      return result;
    };

    it("fetches data correctly when a valid url is provided", async () => {
      const result = await testCallbackSetup(anotherValidApiUrl);

      await assertHookResults(
        result,
        anotherValidApiExpectedData,
        false,
        false
      );

      assertFetchAndJsonCalled(anotherValidApiUrl, true);
    });

    it("handles the case of fetch error occurring", async () => {
      const result = await testCallbackSetup(fetchInvalidApiUrl);

      await assertHookResults(result, null, true, false);

      assertFetchAndJsonCalled(fetchInvalidApiUrl, false);
    });

    it("handles the case of api error occurring", async () => {
      const result = await testCallbackSetup(apiInvalidApiUrl);

      await assertHookResults(result, null, true, false);

      assertFetchAndJsonCalled(apiInvalidApiUrl, false);
    });
  });

  describe("optional data / error reset at successive fetch calls", () => {
    const testCallbackSetup = async () => {
      const { result, rerender } = renderHook(
        (apiUrl) => useFetchFromApiUrl(apiUrl, true),
        {
          initialProps: validApiUrl,
        }
      );

      // Wait for the initial fetch to complete.
      await assertHookResults(result, validApiExpectedData, false, false);

      // Restore all mocks
      vi.restoreAllMocks();

      return { result, rerender };
    };

    it("it resets results at re-render", async () => {
      const { result, rerender } = await testCallbackSetup();

      rerender(anotherValidApiUrl);

      // data and error are reset
      await assertHookResults(result, null, false, true);

      await assertHookResults(
        result,
        anotherValidApiExpectedData,
        false,
        false
      );

      assertFetchAndJsonCalled(anotherValidApiUrl, true);
    });

    it("it resets results at fetch on demand", async () => {
      const { result } = await testCallbackSetup(anotherValidApiUrl);

      // call the callback
      act(() => {
        result.current.fetchFromApiUrl(anotherValidApiUrl, true);
      });

      // data and error are reset
      await assertHookResults(result, null, false, true);

      await assertHookResults(
        result,
        anotherValidApiExpectedData,
        false,
        false
      );

      assertFetchAndJsonCalled(anotherValidApiUrl, true);
    });
  });
});

// Restore all mocks
vi.restoreAllMocks();
