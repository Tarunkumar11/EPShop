import React from 'react'

function UpdatePassword() {
    return (
        <div className="update-password">
            <div className="dropdown-menu">
                <form className="px-4 py-3">    
                    <div className="form-group">
                        <label for="exampleDropdownFormPassword1">Password</label>
                        <input type="password" className="form-control" id="exampleDropdownFormPassword1" placeholder="Password" />
                    </div>

                    <div className="form-group">
                        <label for="exampleDropdownFormPassword1">ConfirmPassword</label>
                        <input type="password" className="form-control" id="exampleDropdownFormPassword1" placeholder="Password" />
                    </div>
                    <button type="submit" className="btn btn-primary">Reset Password</button>
                </form>
                <div className="dropdown-divider"></div>
            </div>
        </div>
    )
}

export default UpdatePassword
