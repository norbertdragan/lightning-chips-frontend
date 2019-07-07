import React, { useState, useContext, useEffect } from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import Button from "./Button";
import Slider from "./Slider";
import { DispatchContext, StateContext } from "../store/context";
import playerStringToId from "../../lib/playerStringToId";
import {
  bet,
  collectChips,
  updateGame,
  toggleControls,
  sendMessage
} from "../Game/gameAPI";

const Controls = props => {
  const dispatch = useContext(DispatchContext);
  const state = useContext(StateContext);
  const [toCall, setToCall] = useState(state.toCall);
  const [minRaise, setminRaise] = useState(state.minRaise);

  const betAmount = state.players[state.userSeat].betAmount;

  const [raiseAmount, setRaiseAmount] = useState(28000000);
  const canCheck = toCall - betAmount === 0;
  const callAmount = toCall - betAmount;
  const chips = state.players[state.userSeat].chips;

  // const allPossibilities = {
  //   0: "",
  //   1: "small_blind",
  //   2: "big_blind",
  //   3: "check",
  //   4: "raise",
  //   5: "call",
  //   6: "allin",
  //   7: "fold"
  // };

  const handleButtonClick = (action, player, amount) => {
    // Update the previous message with the new data and send it
    let nextAction = state.lastMessage;
    nextAction.playerid = playerStringToId(player);
    nextAction.possibilities = [action];
    if (amount === callAmount) {
      nextAction.betAmount = toCall;
      bet(player, amount, state, dispatch);
    } else {
      nextAction.betAmount = 0;
      bet(player, amount, state, dispatch);
    }
    sendMessage(nextAction, state.userSeat, state, dispatch);
    setTimeout(() => {
      collectChips(state, dispatch);
      updateGame(1, dispatch);
      toggleControls(dispatch);
    }, 1000);
  };

  return (
    <div
      css={css`
        position: absolute;
        bottom: 1.75rem;
        right: 1rem;
      `}
    >
      <div
        css={css`
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 3fr;
        `}
      >
        <Button label="1/2 Pot" small />
        <Button label="Pot" small />
        <Button label="Max" small />
        <Slider
          state={state}
          minRaise={raiseAmount}
          setminRaise={setRaiseAmount}
        />
      </div>
      {/* Fold Button */}
      <Button
        label="Fold"
        onClick={() => handleButtonClick(7, state.userSeat)}
      />
      {/* Check/Call Button */}
      <Button
        label={canCheck ? "Check" : "Call"}
        amount={!canCheck && callAmount}
        onClick={() =>
          canCheck
            ? handleButtonClick(3, state.userSeat, toCall)
            : handleButtonClick(5, state.userSeat, callAmount)
        }
      />
      {/* Raise/All-In Button */}
      <Button
        label={
          minRaise >= chips || toCall >= chips
            ? "All-In"
            : toCall === 0
            ? "Bet"
            : "Raise"
        }
        amount={
          minRaise >= chips || toCall >= chips ? chips + betAmount : raiseAmount
        }
        onClick={() =>
          minRaise >= chips || toCall >= chips
            ? handleButtonClick(6, state.userSeat, chips)
            : handleButtonClick(
                4,
                state.userSeat,
                toCall - betAmount + raiseAmount
              )
        }
      />
    </div>
  );
};

export default Controls;
