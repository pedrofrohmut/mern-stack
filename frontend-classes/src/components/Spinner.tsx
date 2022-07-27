import { Component } from "react"

class Spinner extends Component<any, any> {
  render = () => (
    <div className="loadingSpinnerContainer">
      <div className="loadingSpinner" />
    </div>
  )
}

export default Spinner
