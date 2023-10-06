import './App.css';
import { useState } from 'react';
export default function App() {

  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [output,setOuput]=useState(0);
  const [comment,setComment]=useState('');
 
  function handleHeight(e)
  {
    setHeight(e.target.value);
  }
  function handleWeight(e)
  {
    setWeight(e.target.value);
  }
  async function handleCalculate(e)
  {  
    e.preventDefault();
    try{
      await summitform(height,weight);
      let height_in_meters=height/100;
      let bmi=(weight/(height_in_meters*height_in_meters)).toFixed(2);

      if(bmi<=18.5)
      {
      setOuput(bmi);
      setComment("underweight");
      }
      else if(bmi<=24.9)
     {
      setOuput(bmi);
      setComment("healthy");
     }
     else if(bmi<=29.9)
     {
      setOuput(bmi);
      setComment("overweight");
     }
     else{
      setOuput(bmi);
      setComment("obesity");
     }
    }
    catch(err)
    {
      
      alert(`Kindly give the values in the range- \n"Minimum weight is 25 kg and minimum height is 100 cm." 
      \n "Maximum weight is 180 kg and maximum height is 220."`);
    }
     setHeight(0);
     setWeight(0);
     document.querySelector('input[name="height"]').value = "";
     document.querySelector('input[name="weight"]').value = "";
  }
  
  return (
    <div className="App">
      <div>
        <h1>BMI Calculator</h1>
      </div>
      <form onSubmit={handleCalculate}>
        
          <div className='height-tag'>
            <label>Height(cm)</label>
            <input  name="height" onChange={handleHeight} required />
          </div>
          <div className='weight-tag'>
            <label>Weight(kg)</label>
            <input  name="weight" onChange={handleWeight} required />
          </div>
        <button type="submit">Calculate BMI</button>
        
      </form>

      <p>Your BMI is</p>
      <div className='result'>{output}</div>
      <div>
        <p>Comment: You are <span>{comment}</span>.</p>
      </div>
    </div>
  );
}



function summitform(height,weight)
{
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if ((weight>=25 && weight<=180) && (height>=100 && height<=220)) {
        resolve();
      } else {
        
        reject(new Error());

      }
    }, 150);
  });
}