import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

function ChooseCommunity() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [subreddits] = useOutletContext();

  const toggle = () => {
    setDropdownOpen(!dropdownOpen);

    const option = subreddits.find(
      (subreddits) => subreddits.id === subredditId
    );
  };
  return (
    <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle
        style={{
          marginTop: "10px",
          backgroundColor: "white",
          color: "black",
        }}
        caret
      >
        Choose a community
      </DropdownToggle>
      <DropdownMenu>
        <p>YOUR PROFILE</p>
        <DropdownItem header>Header</DropdownItem>
        <DropdownItem disabled>Action</DropdownItem>
        <DropdownItem>Another Action</DropdownItem>
        <DropdownItem divider />
        <DropdownItem>Another Action</DropdownItem>
      </DropdownMenu>
    </ButtonDropdown>
  );
}

export default ChooseCommunity;
