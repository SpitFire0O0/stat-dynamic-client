import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../components";
import { AuthGuard } from "../components/auth-guard";
import {
	DocsPage,
	ErrorPage,
	HomePage,
	ProfilePage,
	ProfileSettingsPage,
	ProfileHomeworkPage,
	SettingsPage,
	AuthPage,
	MessagesPage,
	AdminPage
} from "../pages"
import { SchedulePage } from "../pages/index.tsx";

export const router = createBrowserRouter([
	{
		path: '/',
		element: (
			// <AuthGuard>
				<Layout />
			// </AuthGuard>
		),
		errorElement: <ErrorPage />,
		children: [
			{
				index: true,
				element: <HomePage />
			},
			{
				path: '/profile/settings',
				element: <ProfileSettingsPage />
			},
			{
				path: '/profile/homework',
				element: <ProfileHomeworkPage />
			},
			{
				path: '/profile',
				element: <ProfilePage />
			},
			{
				path: '/docs',
				element: <DocsPage />
			},
			{
				path: '/schedule',
				element: <SchedulePage />
			},
			{
				path: '/messages',
				element: <MessagesPage />
			},
			{
				path: '/settings',
				element: <SettingsPage />
			},
			{
				path: '/admin',
				element: <AdminPage />
			},
		]
	},
	{
		path: '/auth',
		element: <AuthPage />
	}
]);