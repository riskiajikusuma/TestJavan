CREATE TABLE IF NOT EXISTS assets
(
    id         INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    asset      VARCHAR(255) NOT NULL,
    harga      INT          NOT NULL,
    created_at DATETIME     NOT NULL,
    updated_at DATETIME     NOT NULL,
    deleted_at DATETIME     NULL
);