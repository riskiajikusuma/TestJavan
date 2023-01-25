CREATE TABLE IF NOT EXISTS people
(
    id            INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nama          VARCHAR(255) NOT NULL,
    jenis_kelamin VARCHAR(255) NOT NULL,
    created_at    DATETIME     NOT NULL,
    updated_at    DATETIME     NOT NULL,
    deleted_at    DATETIME     NULL,
    family_id     INT UNSIGNED NULL,
    CONSTRAINT people_family_id_foreign_idx
    FOREIGN KEY (family_id) REFERENCES families (id)
);