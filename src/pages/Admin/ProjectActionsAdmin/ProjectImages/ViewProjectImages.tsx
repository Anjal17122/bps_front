import { Carousel, Modal } from "antd";
import React from "react";
import { PROJECT_IMAGES } from "../../../../Services/Api";
import { GETProjectImagesBody } from "../../../../Services/ProjectImagesServices";

interface Props {
  isVisible: boolean;
  onClose: () => void;
  data: GETProjectImagesBody[] | undefined;
}

const ViewProjectImages = ({ isVisible, onClose, data }: Props) => {
  return (
    <Modal
      className="SelectUserModal"
      bodyStyle={{ borderRadius: 16 }}
      open={isVisible}
      footer={false}
      maskClosable={false}
      onCancel={onClose}
      destroyOnClose={true}
    >
      {data ? (
        data.map((images) => {
          const imageList: string[] = JSON.parse(images.name);
          return (
            <div className="ProjectImagesCarousel" key={images.id}>
              <Carousel
                className=""
                style={{ height: 400, marginBottom: 15 }}
                autoplay
                key={images.id}
              >
                {imageList.map((imag, index) => (
                  <div key={index} className="">
                    <img
                      style={{ objectFit: "fill" }}
                      src={PROJECT_IMAGES + imag}
                      alt=""
                      width="auto"
                      height="400px"
                    />
                  </div>
                ))}
              </Carousel>
              <p style={{ fontSize: 14 }}>{images.description}</p>
            </div>
          );
        })
      ) : (
        <div>Loading...</div>
      )}
    </Modal>
  );
};

export default ViewProjectImages;
