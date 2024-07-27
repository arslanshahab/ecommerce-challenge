import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SearchFilter from "@/components/SearchFilter";
import { apiService } from "@/services/api";

jest.mock("@/services/api");

const mockCategories = [
  { categoryName: "Category 1", id: 1 },
  { categoryName: "Category 2", id: 2 },
];

beforeEach(() => {
  (apiService.get as jest.Mock).mockResolvedValue(mockCategories);
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("SearchFilter", () => {
  test("renders search filter with input and dropdown", async () => {
    render(<SearchFilter onSearch={jest.fn()} onFilter={jest.fn()} />);

    // Wait for the categories to be fetched and rendered
    await waitFor(() =>
      expect(screen.getByText("Category 1")).toBeInTheDocument()
    );
    expect(screen.getByPlaceholderText(/ادخل اسم المنتج/i)).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  test("handles search input change", () => {
    const handleSearch = jest.fn();
    render(<SearchFilter onSearch={handleSearch} onFilter={jest.fn()} />);

    fireEvent.change(screen.getByPlaceholderText(/ادخل اسم المنتج/i), {
      target: { value: "Test" },
    });
    expect(handleSearch).toHaveBeenCalledWith("Test");
  });

test("handles category change", async () => {
    const handleFilter = jest.fn();
    render(<SearchFilter onSearch={jest.fn()} onFilter={handleFilter} />);
  
    await waitFor(() => expect(screen.getByText("Category 1")).toBeInTheDocument());
  
    const selectElement = screen.getByRole('combobox');
    fireEvent.change(selectElement, { target: { value: "1" } });
    expect(selectElement).toHaveValue("1");
    expect(handleFilter).toHaveBeenCalledWith("1");
  });
  
});
