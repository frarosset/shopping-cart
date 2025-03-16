import { vi, describe, it, expect, afterEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import useFetchFromApiUrl from "./useFetchFromApiUrl";

const validApiUrl = "some/valid/url";
const validApiExpectedData = { data: "valid" };

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
  } else if (url === fetchInvalidApiUrl) {
    return Promise.reject(fetchInvalidApiUrlError);
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

describe("useFetchFromApiUrl", () => {
  describe("data output", () => {
    it("fetches data (initialized with null) when a valid url is provided", async () => {
      const { result } = renderHook(() => useFetchFromApiUrl(validApiUrl));

      expect(result.current.data).toBe(null);

      // check that fetch has been called with the correct url
      expect(fetch).toHaveBeenCalledWith(validApiUrl, expect.anything());

      await waitFor(() => {
        expect(result.current.data).toEqual(validApiExpectedData);
      });

      expect(jsonMock).toHaveBeenCalled();
    });

    it("returns null data when a fetch error occurs ", async () => {
      const { result } = renderHook(() =>
        useFetchFromApiUrl(fetchInvalidApiUrl)
      );

      expect(result.current.data).toBe(null);

      // check that fetch has been called with the correct url
      expect(fetch).toHaveBeenCalledWith(fetchInvalidApiUrl, expect.anything());

      await waitFor(() => {
        expect(result.current.data).toBe(null);
      });
    });

    it("returns null data when a api error occurs ", async () => {
      const { result } = renderHook(() => useFetchFromApiUrl(apiInvalidApiUrl));

      expect(result.current.data).toBe(null);

      // check that fetch has been called with the correct url
      expect(fetch).toHaveBeenCalledWith(apiInvalidApiUrl, expect.anything());

      await waitFor(() => {
        expect(result.current.data).toBe(null);
      });

      expect(jsonMock).not.toHaveBeenCalled();
    });
  });

  describe("loading output", () => {
    it("returns a loading variable that is true only during the request processing (valid url case)", async () => {
      const { result } = renderHook(() => useFetchFromApiUrl(validApiUrl));

      await waitFor(() => {
        expect(result.current.loading).toBe(true);
      });

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });
    });
  });
});

// Restore all mocks
vi.restoreAllMocks();
