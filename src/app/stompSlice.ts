import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Message {
  topic: string;
  body: string;
}

interface StompState {
  messages: Message[];
}

const initialState: StompState = {
  messages: [],
};

export const stompSlice = createSlice({
  name: "stomp",
  initialState,
  reducers: {
    messageReceived: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
    },
  },
});

export const { messageReceived } = stompSlice.actions;

export default stompSlice.reducer;
