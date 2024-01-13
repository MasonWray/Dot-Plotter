'use client'

import { ChangeEvent } from 'react';

export function FileSelector() {

    function handleFileChange(e: ChangeEvent<HTMLInputElement>) {

    }

    return (
        <div className="card">
            <div className="card-header">File Selector</div>
            <div className="card-body">
                <div className="form-group">
                    <input
                        type="file"
                        className="form-control-file"
                        onChange={handleFileChange} />
                </div>
            </div>
        </div>
    );
}