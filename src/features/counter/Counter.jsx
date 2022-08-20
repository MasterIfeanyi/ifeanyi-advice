import {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux/es/exports'
import { increment, decrement, incrementByAmount } from './counterSlice';


const Counter = () => {

    const dispatch = useDispatch();

    const count = useSelector(state => state.counter.value);

    const [amount, setAmount] = useState("")

    const handleAmount = (e) => setAmount(e.target.value)

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!amount) return
        try {
            await dispatch(incrementByAmount(amount))
        } catch (e) {
            console.log(e.message)
        }

    }

  return (
    <section>
        <div>
            <h1>Counter: {count} </h1>
            <div>
                <button className="increase" onClick={() => dispatch(increment())}>Increase</button>
                <button className="decrease" onClick={() => dispatch(decrement())}>Decrease</button>
            </div>
            <div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input 
                            type="text" 
                            className="form-control"
                            value={amount}
                            onChange={handleAmount}
                        />
                    </div>
                    <div>
                        <button className="text-center">Increase count</button>
                    </div>
                </form>
            </div>
        </div>
    </section>
  )
}

export default Counter