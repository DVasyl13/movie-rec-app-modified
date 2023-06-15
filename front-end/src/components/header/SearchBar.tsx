import './SearchBar.css';

const SearchBar = () => {
    return (
        <div className='search-bar-container'>
            <form action="src/components" className='search-bar'>
                <input className='search-bar-input' type="text" placeholder="Search.." name="q"></input>
                <button type="submit"><img src="../assets/img/search.png" alt="search"></img></button>
                <div className='dropdown-menu'>

                </div>
            </form>
        </div>
    );
};

export default SearchBar;