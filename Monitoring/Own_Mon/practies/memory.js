router.get('/storage', async (req, res) => {
    try {
        const diskData = await si.fsSize();
        console.log(diskData)
        const storage = diskData.map(disk => ({
            mount: disk.mount,
            total: (disk.size / (1024 ** 3)).toFixed(2) + ' GB',
            used: (disk.used / (1024 ** 3)).toFixed(2) + ' GB',
            free: (disk.size - disk.used) / (1024 ** 3).toFixed(2) + ' GB',
            type: disk.type
        }));

        res.json(storage);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch storage information', details: err.message });
    }
});


