CREATE TABLE IF NOT EXISTS person_assets
(
    person_id INT UNSIGNED NOT NULL,
    asset_id  INT UNSIGNED NULL,
    CONSTRAINT person_assets_ibfk_1
        FOREIGN KEY (person_id) REFERENCES people (id),
    CONSTRAINT person_assets_ibfk_2
        FOREIGN KEY (asset_id) REFERENCES assets (id)
);