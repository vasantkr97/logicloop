import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuthUser from "../hooks/userHooks/useAuthUser";
import useSignout from "../hooks/userHooks/useSignout";

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { authUser } = useAuthUser();
  const { signout, isLoading: isSigningOut } = useSignout();

  const handleSignout = () => {
    signout(undefined, {
      onSuccess: () => {
        navigate("/signin");
      },
      onError: (error) => {
        console.error("Signout error:", error);
        // Still redirect even if signout fails
        navigate("/signin");
      }
    });
  };

  const menuItems = [
    {
      name: "Workflows",
      path: "/dashboard",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      ),
    },
    {
      name: "Credentials",
      path: "/credentials",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
        </svg>
      ),
    },
    {
      name: "Executions",
      path: "/executions",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="w-52 bg-gradient-to-b from-gray-950 to-gray-900 text-white flex flex-col border-r border-gray-800 shadow-2xl">
      {/* Header - Compact */}
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-pink-500 rounded-lg flex items-center justify-center shadow-lg shadow-orange-500/30">
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 4h3v7H8V4zm5 0h3v10h-3V4zM8 13h3v7H8v-7z"/>
            </svg>
          </div>
          <h1 className="text-base font-bold bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">n8n</h1>
        </div>
        
        {/* User Profile - Compact */}
        {authUser && (
          <div className="flex items-center gap-2 p-2 rounded-lg bg-gray-800/50 border border-gray-700/50 hover:bg-gray-800 transition-colors">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs font-semibold shadow-lg">
              {authUser.username?.charAt(0).toUpperCase() || authUser.email?.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-white truncate">
                {authUser.username || 'User'}
              </p>
              <p className="text-[10px] text-gray-400 truncate">{authUser.email}</p>
            </div>
          </div>
        )}
      </div>

      {/* Navigation - Compact */}
      <nav className="flex-1 p-3 overflow-y-auto">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`
                    group flex items-center gap-2 px-3 py-2 rounded-lg
                    transition-all duration-200
                    ${isActive
                      ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/30"
                      : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                    }
                  `}
                >
                  <span className={`transition-transform duration-200 ${isActive ? '' : 'group-hover:scale-110'}`}>
                    {item.icon}
                  </span>
                  <span className="text-sm font-medium">{item.name}</span>
                  {isActive && (
                    <div className="ml-auto w-1 h-1 rounded-full bg-white animate-pulse" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="my-4 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />

        {/* Projects Section - Compact */}
        <div>
          <h2 className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-2 px-3">
            Workspace
          </h2>
          <ul className="space-y-1">
            <li>
              <Link
                to="/projects"
                className={`
                  group flex items-center gap-2 px-3 py-2 rounded-lg
                  transition-all duration-200
                  ${location.pathname === "/projects"
                    ? "bg-gradient-to-r from-purple-600 to-purple-500 text-white shadow-lg shadow-purple-500/30"
                    : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                  }
                `}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                </svg>
                <span className="text-sm font-medium">Projects</span>
                {location.pathname === "/projects" && (
                  <div className="ml-auto w-1 h-1 rounded-full bg-white animate-pulse" />
                )}
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Footer - Compact */}
      <div className="p-3 border-t border-gray-800 bg-gray-950/50">
        <button
          onClick={handleSignout}
          disabled={isSigningOut}
          className="
            w-full flex items-center justify-center gap-2 px-3 py-2
            text-gray-400 hover:text-white text-xs
            hover:bg-red-500/10 border border-gray-800 hover:border-red-500/30
            rounded-lg transition-all duration-200
            disabled:opacity-50 disabled:cursor-not-allowed
            group
          "
        >
          <svg className="w-4 h-4 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span className="font-medium">
            {isSigningOut ? "Signing out..." : "Sign Out"}
          </span>
        </button>
      </div>
    </div>
  );
}