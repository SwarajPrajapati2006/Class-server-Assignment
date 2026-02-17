const express = require("express");
const app = express();
app.use(express.json());

const users = [
  { uid: 101, name: "Aarav", attendance: 92, bonus: 5, total_subjects: 14 },
  { uid: 102, name: "Meera", attendance: 88, bonus: 3, total_subjects: 14 },
  { uid: 103, name: "Rohan", attendance: 95, bonus: 7, total_subjects: 14 },
  { uid: 104, name: "Ananya", attendance: 81, bonus: 2, total_subjects: 14 },
  { uid: 105, name: "Kabir", attendance: 90, bonus: 4, total_subjects: 14 }
];

app.get("/users/:id", (req, res) => {
    const id = Number(req.params.id);
    const user = users.find(u => u.uid === id);

    if (!user) {
        return res.status(404).json({
            msg: "no user found",
            data: null
        });
    }

    res.json(user);
});

app.post("/users/user", (req, res) => {
    const user = req.body;

    users.push(user);

    res.status(201).json({
        msg: "successfully added",
        data: user
    });
});

app.put("/user/:id", (req, res) => {
    const id = Number(req.params.id);
    const updates = req.body;

    const user = users.find(u => u.uid === id);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    if (updates.name !== undefined) {user.name = updates.name};
    
    if (updates.attendance !== undefined)
         user.attendance = updates.attendance;
    if (updates.bonus !== undefined)
         user.bonus = updates.bonus;
    if (updates.total_subjects !== undefined)
         user.total_subjects = updates.total_subjects;

    res.json({
        message: "User updated successfully",
        user
    });
});

app.listen(3000, () => {
    console.log("server is running in 3000 port");
});
