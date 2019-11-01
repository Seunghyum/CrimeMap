import React from "react"

const NotFound = () => {
  return (
    <div id="content">
      <br />
      <br />
      <div className="container-fluid">
        <div className="text-center">
          <div className="error mx-auto" data-text="404">
            404
          </div>
          <p className="lead text-gray-800 mb-5">Page Not Found</p>
        </div>
      </div>
    </div>
  )
}

export default NotFound
