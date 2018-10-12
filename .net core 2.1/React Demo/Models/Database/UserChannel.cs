using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace React_Demo.Models.Database
{
    public partial class UserChannel
    {
        public long UserChannelId { get; set; }
        public long UserId { get; set; }
        public long ChannelId { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime JoinDate { get; set; }

        [ForeignKey("ChannelId")]
        [InverseProperty("UserChannel")]
        public Channel Channel { get; set; }
        [ForeignKey("UserId")]
        [InverseProperty("UserChannel")]
        public User User { get; set; }
    }
}
