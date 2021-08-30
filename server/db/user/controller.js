const mongoose = require('mongoose');
const user = require('./user');

const createNewUser = async(userData) => {
    await user.create(userData).then((res) => {
        console.log(res);
    });
}


const login = (username, password) => {
    let data = {
        accountInfo: {
            username: username,
            password: password
        }
    }
    
    return new Promise((resolve, reject) => {
        user.find(data).then((res) => {
            if(res.length != 0)
                resolve(res);
            else
                reject(new Error("invalid username or password"));
        }).catch((err) => {
            console.log(err);
        })
    })

}

const getUserInfoByID = (userID) => {
    return new Promise((resolve, reject) => {
        user.findById(userID).then((data) => {
            (data)? (
                resolve(data)
            ) : (
                reject(new Error("Error! no user found with given ID"))
            );
        }).catch((err) => {
            console.log(err);
        })
    })
    
}

const updateUser = async(userData, userID) => {
    user.findByIdAndUpdate(userID, userData).then((res) => {
        console.log(res);
    }).catch((err) => {
        console.log(err);
    })
}

const deleteUser = async(userID) => {
    user.findByIdAndDelete(userID).then((res) => {
        return res
    })
}

const getCart = (userID) => {
    return new Promise((resolve, reject) => {
        user.findById(userID).then((data) => {
            (data) ? (
                resolve(data.carts)
            ) : (
                resolve("no item in cart")
            )
        }).catch((err) => {
            console.log(err.message);
        })
    })
}

const updateCart = (userID, newCart) => {
    user.findByIdAndUpdate(userID, newCart);
}

module.exports = {
    createNewUser,
    login,
    updateUser,
    deleteUser,
    getUserInfoByID,
    getCart,
    updateCart,
}