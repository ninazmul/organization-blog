import { useSelector } from 'react-redux';

const ThemeProvider = ({children}) => {
    const { theme } = useSelector(state => state.theme);

    return (
        <div className={theme}>
            <div className='bg-white text-green-900 dark:text-green-200 dark:bg-[rgb(8,4,23)] min-h-screen'>
                {children}
            </div>
        </div>
    );
};

export default ThemeProvider;