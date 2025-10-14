import { FaSearch } from 'react-icons/fa';
import { useGlobalContext } from '../context/GlobalContext';
import { useEffect, useRef } from 'react';

export default function Search() {
    const { search, setSearch } = useGlobalContext();
    const searchRef = useRef(null);
    const buttonRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (
                searchRef.current &&
                !searchRef.current.contains(event.target) &&
                buttonRef.current &&
                !buttonRef.current.contains(event.target)
            ) {
                setSearch('');
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [setSearch]);

    return (
        <div className='search-bar' ref={searchRef}>
            <input
                type="text"
                className='input-control'
                placeholder='Cerca esercizio'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <button className='search-button' ref={buttonRef}>
                <FaSearch size={30} />
            </button>
        </div>
    );
}
