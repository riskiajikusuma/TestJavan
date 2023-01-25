CREATE TABLE IF NOT EXISTS families
(
    id                  INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    kepala_keluarga     VARCHAR(255) NOT NULL,
    created_at          DATETIME     NOT NULL,
    updated_at          DATETIME     NOT NULL,
    deleted_at          DATETIME     NULL
);