import React, { useState } from "react";
import { User, initialUsers } from "./components/todolist/types";
import {
  Modal,
  Box,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";
import {
  Delete,
  Edit,
  Visibility,
  Brightness4,
  Brightness7,
} from "@mui/icons-material";

const App = () => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "active" | "inactive"
  >("all");
  const [cityFilter, setCityFilter] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAsideOpen, setIsAsideOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const editUser = (user: User | null = null) => {
    setCurrentUser(
      user || {
        id: Date.now(),
        name: "",
        email: "",
        city: "",
        status: false,
        phone: "",
        img: "",
      }
    );
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentUser(null);
  };

  const saveUser = () => {
    if (currentUser) {
      if (users.some((user) => user.id === currentUser.id)) {
        setUsers((prev) =>
          prev.map((user) => (user.id === currentUser.id ? currentUser : user))
        );
      } else {
        setUsers((prev) => [...prev, currentUser]);
      }
      closeModal();
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.body.classList.toggle("dark", newTheme === "dark");
  };

  const filterByStatus = (users: User[]) => {
    if (statusFilter === "all") return users;
    return statusFilter === "active"
      ? users.filter((user) => user.status)
      : users.filter((user) => !user.status);
  };

  const filterByCity = (users: User[]) => {
    if (cityFilter === "all") return users;
    return users.filter((user) => user.city === cityFilter);
  };

  const searchedUsers = filterByCity(filterByStatus(users)).filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.city.toLowerCase().includes(search.toLowerCase())
  );

  const deleteUser = (id: number | string) => {
    setUsers((prev) => prev.filter((user) => user.id !== id));
  };

  const infoUser = (user: User) => {
    setSelectedUser(user);
    setIsAsideOpen(true);
  };

  const closeAside = () => {
    setIsAsideOpen(false);
    setSelectedUser(null);
  };

  const uniqueCities = Array.from(new Set(users.map((user) => user.city)));

  return (
    <div
      className={`p-4 h-[100vh] ${
        theme === "dark" ? "dark bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">User List</h1>
        <div className="flex gap-4">
          <button
            onClick={toggleTheme}
            className="px-4 py-2 bg-gray-400 text-white rounded flex items-center gap-2"
          >
            {theme === "light" ? <Brightness4 /> : <Brightness7 />}
            {theme === "light" ? "Dark Mode" : "Light Mode"}
          </button>
          <button
            onClick={() => editUser()}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            + New
          </button>
        </div>
      </div>

      <div className="flex gap-4 mb-4 items-center">
        <Select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value as "all" | "active" | "inactive")
          }
          className="w-48 dark:bg-gray-800 dark:text-white"
          sx={{
            color: theme === "dark" ? "white" : "inherit",
            "& .MuiSelect-icon": {
              color: theme === "dark" ? "white" : "inherit",
            },
          }}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="active">Active</MenuItem>
          <MenuItem value="inactive">Inactive</MenuItem>
        </Select>
        <Select
          value={cityFilter}
          onChange={(e) => setCityFilter(e.target.value as string)}
          className="w-48 dark:bg-gray-800 dark:text-white"
          sx={{
            color: theme === "dark" ? "white" : "inherit",
            "& .MuiSelect-icon": {
              color: theme === "dark" ? "white" : "inherit",
            },
          }}
        >
          <MenuItem value="all">All Cities</MenuItem>
          <MenuItem value="Dushanbe">Dushanbe</MenuItem>
          <MenuItem value="Khujand">Khujand</MenuItem>
          <MenuItem value="Kulob">Kulob</MenuItem>
          <MenuItem value="Istaravshan">Istaravshan</MenuItem>
          {uniqueCities.map((city) => (
            <MenuItem key={city} value={city}>
              {city}
            </MenuItem>
          ))}
        </Select>
        <input
          type="text"
          placeholder="Search by name, email, or city"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4  py-2 border rounded w-full dark:bg-gray-800 dark:text-white"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 dark:bg-gray-800 dark:text-white">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700">
              <th className="py-3 px-4 border border-gray-200 dark:border-gray-600 text-left">
                User
              </th>
              <th className="py-3 px-4 border border-gray-200 dark:border-gray-600 text-left">
                City
              </th>
              <th className="py-3 px-4 border border-gray-200 dark:border-gray-600 text-left">
                Status
              </th>
              <th className="py-3 px-4 border border-gray-200 dark:border-gray-600 text-left">
                Phone
              </th>
              <th className="py-3 px-4 border border-gray-200 dark:border-gray-600 text-left">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {searchedUsers.map((user) => (
              <tr
                key={user.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <td className="py-2 px-4 border border-gray-200 dark:border-gray-600">
                  <div className="flex items-center gap-4">
                    <img
                      src={user.img || "https://via.placeholder.com/40"}
                      alt={user.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {user.email}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="py-2 px-4 border border-gray-200 dark:border-gray-600">
                  {user.city}
                </td>
                <td className="py-2 px-4 border border-gray-200 dark:border-gray-600">
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      user.status
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {user.status ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="py-2 px-4 border border-gray-200 dark:border-gray-600">
                  {user.phone}
                </td>
                <td className="py-2 px-4 border border-gray-200 dark:border-gray-600">
                  <button
                    onClick={() => editUser(user)}
                    className="text-yellow-500 hover:text-yellow-700"
                  >
                    <Edit />
                  </button>
                  <button
                    onClick={() => deleteUser(user.id)}
                    className="text-red-500 hover:text-red-700 ml-2"
                  >
                    <Delete />
                  </button>
                  <button
                    onClick={() => infoUser(user)}
                    className="text-blue-500 hover:text-blue-700 ml-2"
                  >
                    <Visibility />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal open={isModalOpen} onClose={closeModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
          className="dark:bg-gray-800 dark:text-white"
        >
          <Typography variant="h6" component="h2" className="mb-4">
            {currentUser?.id ? "Edit User" : "Add User"}
          </Typography>
          {currentUser && (
            <div className="space-y-4">
              <TextField
                label="Name"
                value={currentUser.name}
                onChange={(e) =>
                  setCurrentUser({ ...currentUser, name: e.target.value })
                }
                fullWidth
              />
              <TextField
                label="Email"
                value={currentUser.email}
                onChange={(e) =>
                  setCurrentUser({ ...currentUser, email: e.target.value })
                }
                fullWidth
              />
              <TextField
                label="City"
                value={currentUser.city}
                onChange={(e) =>
                  setCurrentUser({ ...currentUser, city: e.target.value })
                }
                fullWidth
              />
              <TextField
                label="Phone"
                value={currentUser.phone}
                onChange={(e) =>
                  setCurrentUser({ ...currentUser, phone: e.target.value })
                }
                fullWidth
              />
              <TextField
                label="Image URL"
                value={currentUser.img}
                onChange={(e) =>
                  setCurrentUser({ ...currentUser, img: e.target.value })
                }
                fullWidth
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={currentUser.status}
                    onChange={(e) =>
                      setCurrentUser({
                        ...currentUser,
                        status: e.target.checked,
                      })
                    }
                  />
                }
                label="Status"
                className="dark:text-white"
              />
              <Button
                variant="contained"
                color="primary"
                onClick={saveUser}
                className="mt-4"
              >
                Save
              </Button>
            </div>
          )}
        </Box>
      </Modal>

      {isAsideOpen && selectedUser && (
        <div className="fixed top-0 right-0 h-full w-96 bg-white dark:bg-gray-800 shadow-lg p-6 overflow-y-auto">
          <button
            onClick={closeAside}
            className="text-gray-500 hover:text-gray-700 dark:text-white dark:hover:text-gray-300"
          >
            Close
          </button>
          <h2 className="text-xl font-bold mb-4">User Details</h2>
          <div className="space-y-4">
            <img
              src={
                selectedUser.img ||
                "data:image/jpeg;base64,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"
              }
              alt={selectedUser.name}
              className="w-20 h-20 rounded-full"
            />
            <p>
              <strong>Name:</strong> {selectedUser.name}
            </p>
            <p>
              <strong>Email:</strong> {selectedUser.email}
            </p>
            <p>
              <strong>City:</strong> {selectedUser.city}
            </p>
            <p>
              <strong>Phone:</strong> {selectedUser.phone}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              {selectedUser.status ? "Active" : "Inactive"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
