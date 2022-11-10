const Start = ({handleStart,setPlayersName}) => {

    return ( 
        <div className="start">
            <input
                type="text"
                placeholder="Enter your nickname"
                required
                onChange = {(e) => setPlayersName(e.target.value)}
            />
            <button onClick={handleStart}>
                Start
            </button>
        </div>
     );
}
 
export default Start;