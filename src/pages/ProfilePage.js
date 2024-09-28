import React from 'react';
import { Card, Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../assets/ProfilePage.css';

const ProfilePage = ({ userData }) => {
    const { username, email } = userData;
    const [profilePicture, setProfilePicture] = React.useState(null);
    const navigate = useNavigate();

    const handleProfilePictureChange = (e) => {
        setProfilePicture(URL.createObjectURL(e.target.files[0]));
    };

    const renderProfilePicture = () => (
        <OverlayTrigger
            placement="top"
            overlay={
                <Tooltip id="tooltip-top">
                    Нажмите, чтобы загрузить новое фото профиля
                </Tooltip>
            }
        >
            <div className="profile-picture-container" onClick={() => document.getElementById('profilePictureInput').click()}>
                {profilePicture ? (
                    <img src={profilePicture} alt="Profile" className="profile-picture" />
                ) : (
                    <div className="profile-placeholder"></div>
                )}
                <input
                    type="file"
                    id="profilePictureInput"
                    onChange={handleProfilePictureChange}
                    style={{ display: 'none' }}
                />
            </div>
        </OverlayTrigger>
    );

    return (
        <div className="profile-page-container">
            <div className="profile-card p-4">
                <Card.Body>
                    <h3 className="text-center mb-4 profile-title">Профиль</h3>
                    <div className="text-center mb-4">
                        {renderProfilePicture()}
                    </div>
                    <Form.Group controlId="formUsername">
                        <Form.Label className="form-label">Имя пользователя</Form.Label>
                        <Form.Control type="text" value={username} readOnly className="form-control" />
                    </Form.Group>

                    <Form.Group controlId="formEmail" className="mt-3">
                        <Form.Label className="form-label">Email</Form.Label>
                        <Form.Control type="email" value={email} readOnly className="form-control" />
                    </Form.Group>

                    <button
                        className="analytics-button mt-4 w-100"
                        onClick={() => navigate('/home')}
                    >
                        Перейти к аналитике
                    </button>
                </Card.Body>
            </div>
        </div>
    );
};

export default ProfilePage;
