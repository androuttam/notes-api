const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

const router = express.Router();


// REGISTER

router.post('/register', async (req, res) => {

    try {

        const { name, mobile, password } = req.body;

        const existingUser =
            await User.findOne({ mobile });

        if (existingUser) {

            return res.status(400).json({
                status: false,
                message: 'Mobile already registered'
            });

        }

        const hashedPassword =
            await bcrypt.hash(password, 10);

        const user =
            await User.create({

                name,
                mobile,
                password: hashedPassword

            });

        res.json({

            status: true,
            message: 'User Registered',

            data: user

        });

    } catch (e) {

        res.status(500).json({
            error: e.message
        });

    }

});


// LOGIN

router.post('/login', async (req, res) => {

    try {

        const { mobile, password } = req.body;

        const user =
            await User.findOne({ mobile });

        if (!user) {

            return res.status(400).json({

                status: false,
                message: 'User not found'

            });

        }

        const isMatch =
            await bcrypt.compare(
                password,
                user.password
            );

        if (!isMatch) {

            return res.status(400).json({

                status: false,
                message: 'Wrong password'

            });

        }

        const token =
            jwt.sign(

                {
                    userId: user._id
                },

                process.env.JWT_SECRET

            );

        res.json({

            status: true,

            token: token,

            user: {

                id: user._id,
                name: user.name,
                mobile: user.mobile

            }

        });

    } catch (e) {

        res.status(500).json({
            error: e.message
        });

    }

});

module.exports = router;