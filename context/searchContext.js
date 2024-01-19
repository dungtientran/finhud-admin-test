const { createContext, useState } = require("react");



export const SearchContext = createContext();



const SearchContextProvider = ({children}) =>{
    const [search, setSearch] = useState('');
    const [isSearch, setIsSearch] = useState(false)

    const value = {
        search,
        setSearch,
        isSearch,
        setIsSearch
    }
    return (
        <SearchContext.Provider value={value}>
            {children}
        </SearchContext.Provider>
    )
}

export default SearchContextProvider