import { useGlobalContext } from "../context/GlobalContext";
import "../style/sortFilter.css";

export default function SelectFilter() {
    const { handleSort, setCategory, } = useGlobalContext()
    return (
        <>
            <div className="filter-box">
                <h3>Filtra gli esercizi</h3>

                <div className="filter-section">
                    <label>Ordina per:</label>
                    <select onChange={e => handleSort(e.target.value)}>
                        <option value="">Nessun ordinamento</option>
                        <option value="title_asc">Dalla A alla Z</option>
                        <option value="title_desc">Dalla Z alla A</option>
                    </select>
                </div>

                <div className="filter-section">
                    <label>Categoria:</label>
                    <select onChange={e => setCategory(Number(e.target.value))}>
                        <option value="">Tutte</option>
                        <option value="1">Petto</option>
                        <option value="2">Gambe</option>
                        <option value="3">Schiena</option>
                        <option value="4">Spalle</option>
                        <option value="5">Cardio</option>
                    </select>
                </div>
            </div>
        </>
    )
}