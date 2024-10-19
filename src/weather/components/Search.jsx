import PropTypes from 'prop-types';
import search_icon from '/assets/search.png'

export const Search = ({search_value, onInputChange, handleOption}) => {
    

    return (
        <>
            <div className='flex flex-row gap-0'>
                <input

                    className='rounded-tl-md rounded-bl-md p-2'
                    type="text"
                    placeholder="Ingrese una ciudad"
                    name='search_value'
                    value={search_value}
                    onChange={onInputChange}
                />
                <button onClick={()=>handleOption(search_value)}>

                    <img className='p-3 w-11 h-11 rounded-tr-md rounded-br-md bg-white hover:bg-slate-300' src={search_icon} alt="" />
                </button>

            </div>
        </>
    )
}

Search.propTypes = {
    search_value: PropTypes.string,
    onInputChange: PropTypes.func,
    handleOption: PropTypes.func,
};