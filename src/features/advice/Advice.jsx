import { useGetAdviceQuery } from "./adviceApiSlice"
import "./Advice.css"
import { useEffect, useRef } from "react";


const Advice = () => {

    const {
        data: advice,
        isSuccess,
        isLoading,
        isError,
        error,
        refetch
    } = useGetAdviceQuery();

    const timerId = useRef();

    useEffect(() => {

        timerId.current = setInterval(() => refetch(), 300000);

        return () => clearInterval(timerId.current)
    })




  return (
    <section className="section flexing" id="section-background">
        <div className="container">
            <div className="row d-flex justify-content-center align-items-center">
                <div className="col-md-6">
                    <div className="advice text-center flexing">
                        {isError && (<p className="fw-bold text-danger leads">
                            {error.error}
                        </p>) }
                        {isSuccess && (
                            <p className="leads fw-bold text-light">{advice}</p>
                        )}
                        {isLoading && (
                            <div className="mexican-wave mb-5"></div>
                        )}
                          <button className="btn btn-primary btn-small animate__animated animate__rubberBand form-button"
                              onClick={() => refetch()}
                        >Get Advice</button>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Advice