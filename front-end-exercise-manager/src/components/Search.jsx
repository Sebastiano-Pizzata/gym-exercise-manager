import { FaSearch } from 'react-icons/fa';

export default function Search() {
    return (
        <>
            <div className='search-bar'>
                <input
                    type="text"
                    className='input-control'
                    placeholder='Cerca esercizio' />
                <button className='search-button'><FaSearch size={30} /></button>
            </div>
        </>
    )
}