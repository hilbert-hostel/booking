import React from "react";
import { render, RenderResult } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory, MemoryHistory } from "history";

export const renderWithRouter = (
  ui: React.ReactElement,
  routeAndHistory?: { route: string; history: MemoryHistory }
): RenderResult & { history: MemoryHistory } => {
  const { route, history } = routeAndHistory
    ? routeAndHistory
    : { route: "/", history: createMemoryHistory({ initialEntries: ["/"] }) };
  return {
    ...render(<Router history={history}>{ui}</Router>),
    // adding `history` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    history
  };
};
