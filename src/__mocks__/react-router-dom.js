import React from 'react';

export const BrowserRouter = ({ children }) => <div data-testid="browser-router">{children}</div>;
export const Routes = ({ children }) => <div data-testid="routes">{children}</div>;
export const Route = ({ element }) => <div data-testid="route">{element}</div>;
export const Link = ({ to, children, ...props }) => <a href={to} {...props}>{children}</a>;
export const useLocation = () => ({ pathname: '/' });
export const useNavigate = () => jest.fn();