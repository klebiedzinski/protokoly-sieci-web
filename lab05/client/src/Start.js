const Start = ({handleStart,setPlayersName}) => {

    return ( 
        <div className="start">
            <button className="start" onClick={handleStart}>
                Start
            </button>
            <input
                type="text"
                placeholder="Title"
                required
                onChange = {(e) => setPlayersName(e.target.value)}
            />
        </div>
     );
}
 
export default Start;