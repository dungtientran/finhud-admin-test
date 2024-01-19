import TextArea from 'antd/lib/input/TextArea';
import React from 'react';

const CommentComponent = ({getComment, validateComment}) => {
    return (
        <div style={{ marginTop: '40px' }}>
            <p style={{
                fontSize: '17px'
            }}>
                Nhận xét
                {!validateComment && (
                    <span
                        style={{
                            marginLeft: '30px',
                            fontSize: '12px',
                            color: 'red'
                        }}
                    >
                        * Nhận xét trước khi từ chối
                    </span>
                )}
            </p>
            <div style={{
                marginTop: '26px',
                fontSize: '17px',
            }}>
                <TextArea
                    style={{
                        height: 120,
                        resize: 'none',
                        fontSize: '17px',
                        padding: "18px 10px"

                    }}
                    onChange={(e) => getComment(e.target.value)}
                    placeholder="Nhập thông tin đánh giá"
                />
            </div>
        </div>
    )
}

export default CommentComponent
