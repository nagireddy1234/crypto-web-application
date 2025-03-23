import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useGetPrice } from "./useGetPrice";
import { vi } from "vitest";

const createWrapper = () => {
  const queryClient = new QueryClient();
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

vi.mock("@/settings", () => ({
  settings: {
    api: {
      baseUrl: "https://mock-api.com",
    },
  },
}));

describe("useGetPrice", () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it("fetches price data successfully", async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ price: 123.45 }),
      })
    ) as unknown as jest.Mock;

    const { result } = renderHook(() => useGetPrice("TON/USDT"), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual({ price: 123.45 });
  });

  it("Loading state test", async () => {
    global.fetch = vi.fn(() => new Promise(() => {})) as unknown as jest.Mock;
    const { result } = renderHook(() => useGetPrice("TON/USDT"), {
      wrapper: createWrapper(),
    });
    expect(result.current.isLoading).toBe(true);
  });

  it("Error state test", async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
        statusText: "Internal Server Error",
      })
    ) as unknown as jest.Mock;
    const { result } = renderHook(() => useGetPrice("TON/USDT"), {
      wrapper: createWrapper(),
    });
    await waitFor(() => expect(result.current.isError).toBe(true));
  });
});
