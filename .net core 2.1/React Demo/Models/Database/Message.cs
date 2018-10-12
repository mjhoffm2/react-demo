using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace React_Demo.Models.Database
{
    public partial class Message
    {
        public long MessageId { get; set; }
        public long ChannelId { get; set; }
        public long UserId { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime Timestamp { get; set; }
        [Required]
        [Column("Message")]
        public string Message1 { get; set; }
        public bool IsEdited { get; set; }

        [ForeignKey("ChannelId")]
        [InverseProperty("Message")]
        public Channel Channel { get; set; }
        [ForeignKey("UserId")]
        [InverseProperty("Message")]
        public User User { get; set; }
    }
}
