import { vi, describe, it, expect, afterEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import useFetchFromApiUrl from "./useFetchFromApiUrl";

const validApiUrl = "some/valid/url";
const validApiExpectedData = { data: "valid" };

const fetchInvalidApiUrl = "some/fetch/invalid/url";
const fetchInvalidApiUrlError = "Fetch Invalid Error";

// Mock global fetch
global.fetch = vi.fn((url) => {
  if (url === validApiUrl) {
    return Promise.resolve({
      json: () => Promise.resolve(validApiExpectedData),
    });
  } else if (fetchInvalidApiUrl) {
    return Promise.reject(fetchInvalidApiUrlError);
  }
});

/* mocks are hoisted: reset them after each test */
afterEach(() => {
  vi.resetAllMocks();
});

describe("useFetchFromApiUrl", () => {
  it("fetches data (initialized with null) when a valid url is provided", async () => {
    const { result } = renderHook(() => useFetchFromApiUrl(validApiUrl));

    expect(result.current.data).toBe(null);

    // check that fetch has been called with the correct url
    expect(fetch).toHaveBeenCalledWith(validApiUrl, expect.anything());

    await waitFor(() => {
      expect(result.current.data).toEqual(validApiExpectedData);
    });
  });

  it("returns null data when a fetch error occurs ", async () => {
    const { result } = renderHook(() => useFetchFromApiUrl(fetchInvalidApiUrl));

    expect(result.current.data).toBe(null);

    // check that fetch has been called with the correct url
    expect(fetch).toHaveBeenCalledWith(fetchInvalidApiUrl, expect.anything());

    await waitFor(() => {
      expect(result.current.data).toBe(null);
    });
  });
});

// Restore all mocks
vi.restoreAllMocks();
