import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export const LinkSidebar = ({
    to,
    icon,
    title,
    isActive,
}: {
    to: string;
    icon: any;
    title: string;
    isActive: boolean;
}) => {
    return (
        <Link
            to={to}
            className={`flex items-center gap-3 px-3 py-2 text-neutral-900 dark:text-neutral-200 font-semibold uppercase rounded-md
        transition-all duration-300 ease-in-out
        ${isActive
                    ? 'bg-indigo-600 text-white shadow-inner hover:bg-indigo-700 dark:hover:bg-indigo-700'
                    : 'hover:bg-neutral-200 dark:hover:bg-neutral-800'}
      `}
        >
            <FontAwesomeIcon
                icon={icon}
                className="w-6 h-6 text-center text-current flex-shrink-0"
            />
            <span className="truncate">{title}</span>
        </Link>
    );
};