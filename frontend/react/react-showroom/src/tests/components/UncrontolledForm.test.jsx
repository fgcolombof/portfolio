import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import ProfileForm from "../../components/UncontrolledForm";

describe("ProfileForm Component", () => {
  it("It should display an error message if username is too short", () => {
    render(
      <BrowserRouter>
        <ProfileForm />
      </BrowserRouter>,
    );

    // 1. It simulates typing in the username input field
    const userNameInput = screen.getByPlaceholderText(/Add a valid userName/i);
    fireEvent.change(userNameInput, {
      target: {
        value: "U1",
      },
    });

    // 2. It simulates clicking the submit button
    const submitBtn = screen.getByRole("button", { name: /Submit Changes/i });
    fireEvent.click(submitBtn);

    // 3. Check that the Zod error message appears
    expect(
      screen.getByText(/The username must be at least 3 characters long./i),
    ).toBeInTheDocument();
  });

  it("It should display an error message if the email is invalid", () => {
    render(
      <BrowserRouter>
        <ProfileForm />
      </BrowserRouter>,
    );

    // 1. It simulates typing in the email input field
    const emailInput = screen.getByPlaceholderText(
      /Add a valid email address/i,
    );
    fireEvent.change(emailInput, {
      target: {
        value: "user.email.com",
      },
    });

    // 2. It simulates clicking the submit button
    const submitBtn = screen.getByRole("button", { name: /Submit Changes/i });
    fireEvent.click(submitBtn);

    // 3. Check that the Zod error message appears
    expect(
      screen.getByText(/Please enter a valid email address./i),
    ).toBeInTheDocument();
  });

  it("It should display the filed contents in the Submitted Data section", () => {
    render(
      <BrowserRouter>
        <ProfileForm />
      </BrowserRouter>,
    );

    // 1. It simulates typing in the username input field
    const userNameInput = screen.getByPlaceholderText(/Add a valid userName/i);
    fireEvent.change(userNameInput, {
      target: {
        value: "user1",
      },
    });

    // 2. It simulates typing in the email input field
    const emailInput = screen.getByPlaceholderText(
      /Add a valid email address/i,
    );
    fireEvent.change(emailInput, {
      target: {
        value: "user1@email.com",
      },
    });

    // 3. It simulates clicking the submit button
    const submitBtn = screen.getByRole("button", { name: /Submit Changes/i });
    fireEvent.click(submitBtn);

    // 4. Check that the submitted data appears
    expect(screen.getByText(/user1$/i)).toBeInTheDocument();
    expect(screen.getByText(/user1@email.com/i)).toBeInTheDocument();
  });
});
