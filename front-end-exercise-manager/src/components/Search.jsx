import { FaSearch } from 'react-icons/fa';
import { useGlobalContext } from '../context/GlobalContext';

export default function Search() {
    const { search, setSearch } = useGlobalContext();
    return (
        <>
            <div className='search-bar'>
                <input
                    type="text"
                    className='input-control'
                    placeholder='Cerca esercizio'
                    value={search}
                    onChange={e => setSearch(e.target.value)} />
                <button className='search-button'><FaSearch size={30} /></button>
            </div>
        </>
    )
}