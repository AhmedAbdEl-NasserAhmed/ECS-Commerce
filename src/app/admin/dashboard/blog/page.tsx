"use client";

import Modal from "@/ui/Modal/Modal";

function BlogPage() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="testPage">
          <button>Test Modal</button>
        </Modal.Open>
        <Modal.Window name="testPage">
          <p>TEST Modal</p>
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default BlogPage;
