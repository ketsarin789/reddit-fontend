import { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

function CreateCommunity() {
  const [isShow, setIsShow] = useState(false);

  const toggle = () => {
    setIsShow(!isShow);
  };

  return (
    <div>
      <Button outline color="primary" onClick={toggle}>
        Create Community
      </Button>
      <Modal isOpen={isShow} toggle={toggle}>
        <ModalHeader toggle={toggle}>Create a Community</ModalHeader>
        <ModalBody>
          <p>Name</p>
          <p>Community names including capitalization cannot be changed.</p>
          <input type="text" value="" />
        </ModalBody>
        <p>Community type</p>
        <div>
          <form>
            <input type="radio" />
            <label>
              Public Anyone can view, post, and comment to this community
            </label>
            <div>
              <input type="radio" />
              <label>
                Public Anyone can view, post, and comment to this community
              </label>
            </div>
            <input type="radio" />
            <label>
              Public Anyone can view, post, and comment to this community
            </label>
          </form>
        </div>
        <ModalFooter>
          <Button outline onClick={toggle}>
            Cancel
          </Button>{" "}
          <Button color="primary" onClick={toggle}>
            Craete Community
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default CreateCommunity;
