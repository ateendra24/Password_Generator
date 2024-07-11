import { useState, useCallback, useEffect,useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  //Ref hook
  const PasswordRef= useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  const copyPassword = useCallback(()=> {
    PasswordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  },[password])


useEffect(()=> {
  passwordGenerator()
},[length,numberAllowed,charAllowed,passwordGenerator])
  return (
    <>
      <div className="flex place-content-center">
        <div className="w-full max-w-md  shadow-md rounded-lg px-5 py-3 my-8 bg-card mx-4 content-center text-card_text">
          <h1 className=" text-center text-2xl font-bold">
            Password Generator
          </h1>
          <p className=" mt-2 mb-6 text-center">
            Generate a secure password with customizable options.
          </p>

          <div className=" text-sm mt-4  flex justify-between content-center">
            <p>Generated Password</p>
            <button className="p-2 hover:bg-neutral-800 rounded-lg" onClick={copyPassword}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 8H10C8.89543 8 8 8.89543 8 10V20C8 21.1046 8.89543 22 10 22H20C21.1046 22 22 21.1046 22 20V10C22 8.89543 21.1046 8 20 8Z"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M4 16C2.9 16 2 15.1 2 14V4C2 2.9 2.9 2 4 2H14C15.1 2 16 2.9 16 4"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </div>
          <div className="flex shadow rounded-lg overflow-hidden mb-6">
            <input
              type="text"
              value={password}
              className="outline-none w-full py-1 px-3 bg-background"
              placeholder="Password"
              readOnly
              ref={PasswordRef}
            />
          </div>

          <div className="flex text-sm gap-x-2 justify-between">
            <div className="flex gap-x-1 flex-col">
              <input
                type="range"
                min={6}
                max={60}
                value={length}
                className="cursor-pointer h-2 bg-gray-200 rounded-lg appearance-none"
                onChange={(e) => {
                  setLength(e.target.value);
                }}
              /> 
              <label className="pt-4" htmlFor="">Length : {length}</label>
            </div>
            <div className="flex flex-col">
            <div className="flex items-center gap-x-1 py-1">
              <input
              className="accent-gray-700 invert checked:accent-gray-700"
                type="checkbox"
                defaultChecked={numberAllowed}
                id="numberInput"
                onChange={() => {
                  setNumberAllowed((prev) => !prev);
                }}
              />
              <label htmlFor="NumberInput">Number</label>
            </div>
            
            <div className="flex items-center gap-x-1 py-1">
              <input
              className="accent-gray-700 invert checked:accent-gray-700"
                type="checkbox"
                defaultChecked={charAllowed}
                id="charInput"
                onChange={() => {
                  setCharAllowed((prev) => !prev);
                }}
              />
              <label htmlFor="charInput">Special Character</label>
            </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
