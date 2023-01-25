CREATE TABLE IF NOT EXISTS family_assets
(
    family_id INT UNSIGNED NOT NULL,
    asset_id  INT UNSIGNED NOT NULL,
    PRIMARY KEY (family_id, asset_id),
    CONSTRAINT family_assets_ibfk_1
        FOREIGN KEY (family_id) REFERENCES families (id),
    CONSTRAINT family_assets_ibfk_2
        FOREIGN KEY (asset_id) REFERENCES assets (id)
);