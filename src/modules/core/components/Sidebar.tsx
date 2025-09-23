import { Link, useLocation } from "react-router-dom";
import {
    CubeIcon,
    TagIcon,
    ChartBarIcon,
    Cog6ToothIcon,
    ArrowLeftStartOnRectangleIcon,
    QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";
import { logout } from "../../auth/services/authService";
import { useTranslation } from 'react-i18next';

export function Sidebar({ isOpen }: { isOpen: boolean }) {
    const location = useLocation();
    const { t } = useTranslation();
    const generalNavItems = [
        { name: t('sidebar.general.products'), icon: CubeIcon, path: "/products" },
        { name: t('sidebar.general.new'), icon: TagIcon, path: "/new-product" },
        { name: t('sidebar.general.analytics'), icon: ChartBarIcon, path: "/analytics" },
    ];

    const accountNavItems = [
        { name: t('sidebar.account.settings'), icon: Cog6ToothIcon, path: "/settings" },
        { name: t('sidebar.account.support'), icon: QuestionMarkCircleIcon, path: "/support" },
    ];

    const handleLogout = async () => {
        try {
            await logout();
            window.location.href = "/login";
        } catch (err) {
            console.error("Logout failed", err);
        }
    };

    const renderNavItems = (items: { name: any; icon: any; path: any; }[]) => (
        items.map(({ name, icon: Icon, path }) => (
            <Link
                key={name}
                to={path}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${location.pathname === path
                    ? "bg-yellow-100 text-yellow-700"
                    : "text-gray-700 hover:bg-gray-100"
                    }`}
            >
                <Icon className="w-5 h-5" />
                {name}
            </Link>
        ))
    );

    return (
        <aside
            className={`bg-white w-64 fixed top-0 left-0 h-full p-6 shadow-md z-40 transform transition-transform duration-200 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"
                } lg:translate-x-0 flex flex-col`}
        >
            <div>
                <h1 className="text-3xl font-bold mb-8">
                    Decor<span className="text-yellow-400">AR</span>
                </h1>

                <h2 className="text-xs font-semibold text-gray-400 mb-2 uppercase">{t('sidebar.general.title')}</h2>
                <nav className="flex flex-col gap-2 mb-6">
                    {renderNavItems(generalNavItems)}
                </nav>

                <h2 className="text-xs font-semibold text-gray-400 mb-2 uppercase">{t('sidebar.account.title')}</h2>
                <nav className="flex flex-col gap-2">
                    {renderNavItems(accountNavItems)}
                </nav>
            </div>

            <div className="mt-auto pt-6">
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg w-full"
                >
                    <ArrowLeftStartOnRectangleIcon className="w-5 h-5" />
                    {t('sidebar.logout')}
                </button>
            </div>
        </aside>
    );
}