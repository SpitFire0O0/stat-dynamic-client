import { JSX, FC } from "react";
import { LogOut, Settings } from "lucide-react";

interface Props {
	icon?: JSX.Element;
	text?: string;
	onClick: () => void;
	isLoading?: boolean;
	variant?: 'default' | 'danger' | 'admin';
	className?: string;
}

export const ProfileBarBtn: FC<Props> = ({ 
	icon, 
	text, 
	onClick, 
	isLoading = false,
	variant = 'default',
	className
}) => {
	const baseClasses = "rounded-[4px] bg-[var(--light-color)] flex items-center justify-center " +
		"transition-colors transition-300 hover:cursor-pointer hover:bg-stone-200";
	
	const variantClasses = variant === 'danger' 
		? 'hover:bg-red-100 hover:text-red-600' 
		: variant === 'admin'
		? 'hover:bg-blue-100 hover:text-blue-600'
		: '';
	
	const sizeClasses = text 
		? 'px-3 py-2 gap-2' 
		: 'w-[32px] h-[32px]';

	return (
		<button 
			onClick={onClick} 
			disabled={isLoading}
			className={`${className} ${baseClasses} ${variantClasses} ${sizeClasses} ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
		>
			{isLoading ? (
				<div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
			) : (
				<>
					{icon || (variant === 'danger' && <LogOut size={16} />) || (variant === 'admin' && <Settings size={16} />)}
					{text && <span className="text-sm font-medium">{text}</span>}
				</>
			)}
		</button>
	);
};