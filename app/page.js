"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Stack,
  Typography,
  Button,
  Modal,
  TextField,
} from "@mui/material";
import { firestore } from "@/firebase";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "white",
  borderRadius: "8px",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  gap: 3,
};

export default function Home() {
  const [inventory, setInventory] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState("");
  const [filteredInventory, setFilteredInventory] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const updateInventory = async () => {
    const snapshot = query(collection(firestore, "inventory"));
    const docs = await getDocs(snapshot);
    const inventoryList = [];
    docs.forEach((doc) => {
      inventoryList.push({ name: doc.id, ...doc.data() });
    });
    setInventory(inventoryList);
  };

  useEffect(() => {
    updateInventory();
  }, []);

  useEffect(() => {
    setFilteredInventory(
      inventory.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, inventory]);
  const addItem = async (item) => {
    const docRef = doc(collection(firestore, "inventory"), item);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      await setDoc(docRef, { quantity: quantity + 1 });
    } else {
      await setDoc(docRef, { quantity: 1 });
    }
    await updateInventory();
  };

  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, "inventory"), item);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      if (quantity === 1) {
        await deleteDoc(docRef);
      } else {
        await setDoc(docRef, { quantity: quantity - 1 });
      }
    }
    await updateInventory();
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box
      width="100vw"
      height="100vh"
      display={"flex"}
      justifyContent={"center"}
      flexDirection={"column"}
      alignItems={"center"}
      gap={2}
      bgcolor="#f9f9f9"
    >
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Item
          </Typography>
          <Stack width="100%" direction={"row"} spacing={2}>
            <TextField
              id="outlined-basic"
              label="Item"
              variant="outlined"
              fullWidth
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
            <Button
              variant="contained"
              onClick={() => {
                addItem(itemName);
                setItemName("");
                handleClose();
              }}
            >
              Add
            </Button>
          </Stack>
        </Box>
      </Modal>
      <Button variant="contained" onClick={handleOpen}>
        Add New Item
      </Button>
      <TextField
        id="search"
        label="Search Items"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ maxWidth: "800px", mb: 2 }}
      />
      <Box
        border={"1px solid #333"}
        borderRadius={"8px"}
        width="90%"
        maxWidth="800px"
        bgcolor={"#ffffff"}
        boxShadow={"0px 4px 8px rgba(0, 0, 0, 0.1)"}
      >
        <Box
          width="100%"
          height="100px"
          bgcolor={"#ADD8E6"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          borderTopLeftRadius={"8px"}
          borderTopRightRadius={"8px"}
        >
          <Typography variant={"h2"} color={"#333"} textAlign={"center"}>
            Inventory Items
          </Typography>
        </Box>
        <Stack
          width="100%"
          spacing={2}
          padding={2}
          maxHeight="400px"
          overflow={"auto"}
        >
          {filteredInventory.map(({ name, quantity }) => (
            <Box
              key={name}
              width="100%"
              minHeight="150px"
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
              bgcolor={"#f0f0f0"}
              padding={3}
              borderRadius={"4px"}
              boxShadow={"0px 2px 4px rgba(0, 0, 0, 0.1)"}
            >
              <Typography variant={"h5"} color={"#333"} textAlign={"center"}>
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </Typography>
              <Typography variant={"h5"} color={"#333"} textAlign={"center"}>
                Quantity: {quantity}
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => removeItem(name)}
              >
                Remove
              </Button>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
