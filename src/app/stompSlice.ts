import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
// Assume you have a function to send a message via WebSocket
// The actual implementation would depend on your WebSocket library and backend
async function sendNewMessage(text: string) {
  // send the message over WebSocket and wait for acknowledgement from the server
}

export const sendMessage = createAsyncThunk(
  "stomp/sendMessage",
  sendNewMessage
);

interface StompState {
  messages: string[];
  sending: boolean;
  lastSendError: string | null;
}

const initialState: StompState = {
  messages: [],
  sending: false,
  lastSendError: null,
};

export const stompSlice = createSlice({
  name: "stomp",
  initialState,
  reducers: {
    messageReceived: (state, action: PayloadAction<string>) => {
      state.messages.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.pending, (state) => {
        state.sending = true;
        state.lastSendError = null;
      })
      .addCase(sendMessage.fulfilled, (state) => {
        state.sending = false;
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.sending = false;
        state.lastSendError = action.error.message || "Failed to send message";
      });
  },
});

export const { messageReceived } = stompSlice.actions;

export default stompSlice.reducer;
