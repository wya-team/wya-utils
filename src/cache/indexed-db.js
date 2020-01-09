export default class IndexedDB {
	constructor(options = {}) {
		this.defaultOptions = {
			name: 'default-db',
			version: 1.0,
		};

		this.setConfig(options);
	}

	setConfig(options = {}) {
		this.defaultOptions = {
			...this.defaultOptions,
			...options
		};

		this.defaultOptions.version = parseInt(this.defaultOptions.version, 10);
	}

	// 删库
	deleteDatabase() {
		const { name, version } = this.defaultOptions;
		window.indexedDB.deleteDatabase(name, version);
	}

	// 删表
	deleteObjecteStore(storeName = 'default-store') {
		const { name, version } = this.defaultOptions;
		return new Promise((resolve) => {
			let request = window.indexedDB.open(name, version);
			request.onsuccess = e => {
				let db = e.target.result;
				db.deleteObjecteStore(storeName);
				resolve();
			};
			request.onerror = () => reject('数据库打开报错');
		});
	}

	/**
	 * @param  {String} storeName 打开xxx数据库。变更时候更新表
	 */
	open(storeName = 'default-store') {
		const { name, version } = this.defaultOptions;
		return new Promise((resolve) => {
			let request = window.indexedDB.open(name, version);
			request.onsuccess = e => resolve(e.target.result);
			request.onerror = () => reject('数据库打开报错');

			// 如果指定的版本号，大于数据库的实际版本号，就会发生数据库升级事件
			request.onupgradeneeded = e => {
				let db = e.target.result;

				// 判断是否存在该表
				if (!db.objectStoreNames.contains(storeName)) {
					// 主键为__id
					let objectStore = db.createObjectStore(storeName, { keyPath: '__id' });

					// objectStore.createIndex
				}
				resolve(db);
			};
		});
	}

	close() {
		return new Promise((resolve, reject) => {
			this.open()
				.then(db => {
					db.close();
					resolve();
				}).catch((e) => {
					console.log(e);
					reject();
				});
		});
	}

	/**
	 * 新增数据指的是向对象仓库写入数据记录。这需要通过事务完成。
	 */
	write(data, storeName = 'default-store') {
		return new Promise((resolve, reject) => {
			this.open(storeName)
				.then(db => {
					// 新建时必须指定表格名称和操作模式（"只读"或"读写"）
					let request = db
						.transaction([storeName], 'readwrite')
						.objectStore(storeName)
						.add(data);

					request.onsuccess = resolve;
					request.onerror = reject;

				}).catch((e) => {
					console.log(e);
					reject();
				});
		});
	}

	/**
	 * 读取数据也是通过事务完成。
	 */
	read(key, storeName = 'default-store') {
		return new Promise((resolve, reject) => {
			this.open(storeName)
				.then(db => {
					let request = db
						.transaction([storeName], 'readwrite')
						.objectStore(storeName)
						.get(key);

					request.onsuccess = e => resolve(e.target.result);
					request.onerror = reject;

				}).catch((e) => {
					console.log(e);
					reject();
				});
		});
	}

	update(data, storeName = 'default-store') {
		return new Promise((resolve, reject) => {
			this.open(storeName)
				.then(db => {
					let request = db
						.transaction([storeName], 'readwrite')
						.objectStore(storeName)
						.put(data); // data中含主键

					request.onsuccess = resolve;
					request.onerror = reject;

				}).catch((e) => {
					console.log(e);
					reject();
				});
		});
	}

	
	delete(key, storeName = 'default-store') {
		return new Promise((resolve, reject) => {
			this.open(storeName)
				.then(db => {
					let request = db
						.transaction([storeName], 'readwrite')
						.objectStore(storeName)
						.delete(key);

					request.onsuccess = resolve;
					request.onreject = reject;

				}).catch((e) => {
					console.log(e);
					reject();
				});
		});
	}

	search(storeName = 'default-store') {
		return new Promise((resolve) => {
			this.open()
				.then(db => {
					let rowData = [];
					let request = db
						.transaction([storeName], 'readwrite')
						.objectStore(storeName)
						.openCursor();
					request.onsuccess = e => {
						let cursor = e.target.result;
						if (cursor) {
							let current = cursor.value;
							rowData.push(current);
							cursor.continue();
						}
						resolve(rowData);
					};

					request.onerror = reject;

				}).catch((e) => {
					console.log(e);
					reject();
				});
		});
	}
}
