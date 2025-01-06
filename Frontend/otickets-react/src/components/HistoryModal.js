import React from 'react';
import { Modal, Box, Typography, List, ListItem, ListItemText } from '@mui/material';

const HistoryModal = ({ open, handleClose, updates }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <Box
        sx={{
          width: 400,
          backgroundColor: 'white',
          padding: 4,
          borderRadius: '8px',
          boxShadow: 3,
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          Ticket History
        </Typography>
        <List>
          {updates.length > 0 ? (
            updates.map((update, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={`${update.action}`}
                  secondary={`on ${new Date(update.timestamp).toLocaleString()}`}
                />
              </ListItem>
            ))
          ) : (
            <Typography>No history available.</Typography>
          )}
        </List>
        <Typography align="right">
          <button onClick={handleClose} style={{ marginTop: '16px', cursor: 'pointer' }}>
            Close
          </button>
        </Typography>
      </Box>
    </Modal>
  );
};

export default HistoryModal;
